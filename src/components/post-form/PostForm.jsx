import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const navigate = useNavigate();

    // 🔹 ONLY userData is reliable
    const userData = useSelector((state) => state.auth.userData);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    // ================= SUBMIT =================
    const submit = async (data) => {
        try {
            console.log("SUBMIT DATA:", data);

            // ✅ STABLE AUTH CHECK (NO RACE CONDITION)
            if (!userData?.$id) {
                alert("Please login to continue");
                return;
            }

            // ================= UPDATE POST =================
            if (post) {
                let imageId = post.featuredimage;

                if (data.image?.[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file?.$id) {
                        if (post.featuredimage) {
                            await appwriteService.deleteFile(post.featuredimage);
                        }
                        imageId = file.$id;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredimage: imageId,
                    userid: post.userid,
                });

                if (!dbPost || !dbPost.$id) {
                    alert("Post update failed. Check Appwrite permissions.");
                    return;
                }

                navigate(`/post/${dbPost.$id}`);
            }

            // ================= CREATE POST =================
            else {
                if (!data.image?.[0]) {
                    alert("Please select a featured image");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (!file || !file.$id) {
                    alert("Image upload failed");
                    return;
                }

                const payload = {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredimage: file.$id,
                    userid: userData.$id,
                };

                console.log("CREATE PAYLOAD:", payload);

                const dbPost = await appwriteService.createPost(payload);

                if (!dbPost || !dbPost.$id) {
                    alert("Post creation failed. Check Appwrite permissions.");
                    return;
                }

                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("POST SUBMIT ERROR:", error);
            alert("Something went wrong. Check console.");
        }
    };

    // ================= SLUG TRANSFORM =================
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    // ================= AUTO SLUG =================
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* LEFT */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            { shouldValidate: true }
                        )
                    }
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* RIGHT */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post?.featuredimage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(
                                post.featuredimage
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-600"}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
