"use client";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { BannerData } from "@/lib/types";

interface CreateBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBannerCreated: (bannerData: BannerData) => void;
}

const CreateBannerModal = ({ isOpen, onClose, onBannerCreated }: CreateBannerModalProps) => {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        link: "",
        order: "0",
        isActive: true,
    });

    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleInputChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = e => reject(e);
        });

    const handleSubmit = async () => {
        if (!formData.title || !formData.subtitle || (!image && !imagePreview)) {
            setSubmitError("Title, subtitle and image are required.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            let uploadedImage = { public_id: "", url: "", alt: "" };

            if (image) {
                const base64 = await fileToBase64(image);
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: base64, folder: 'skygo/banners' }),
                });
                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    uploadedImage = {
                        public_id: uploadData.public_id,
                        url: uploadData.url,
                        alt: formData.title
                    };
                } else {
                    throw new Error(uploadData.error || "Failed to upload image.");
                }
            }

            const payload = {
                ...formData,
                order: Number(formData.order) || 0,
                image: uploadedImage,
            };

            const res = await fetch('/api/banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (data.success) {
                onBannerCreated(data.data);
                handleClose();
            } else {
                setSubmitError(data.error || "Failed to create banner.");
            }
        } catch (err: any) {
            setSubmitError(err.message || "An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            title: "",
            subtitle: "",
            link: "",
            order: "0",
            isActive: true,
        });
        setImage(null);
        setImagePreview(null);
        setSubmitError("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl rounded-[32px] border-none shadow-2xl p-0 bg-white">
                <DialogHeader className="p-8 pb-4 bg-gray-50/50">
                    <DialogTitle className="text-3xl font-black text-[#111827] uppercase tracking-tighter">Add Home Banner</DialogTitle>
                    <DialogDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Create a new hero banner for the home page slider.</DialogDescription>
                </DialogHeader>

                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Banner Title</label>
                            <Input placeholder="e.g. TRAVEL MORE" value={formData.title} onChange={e => handleInputChange("title", e.target.value)} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subtitle / Tagline</label>
                            <Input placeholder="e.g. WORRY LESS" value={formData.subtitle} onChange={e => handleInputChange("subtitle", e.target.value)} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Redirect Link (Optional)</label>
                            <Input placeholder="e.g. /tours or /packages" value={formData.link} onChange={e => handleInputChange("link", e.target.value)} className="h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Order</label>
                            <Input type="number" placeholder="0" value={formData.order} onChange={e => handleInputChange("order", e.target.value)} className="h-12 rounded-xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Banner Image</label>
                        {imagePreview ? (
                            <div className="relative rounded-2xl overflow-hidden aspect-video group">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => { setImage(null); setImagePreview(null); }}
                                    className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                className="border-2 border-dashed border-gray-100 rounded-2xl p-12 text-center cursor-pointer hover:border-[#bd9245] transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Banner Background</p>
                                <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => handleInputChange("isActive", e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#bd9245] focus:ring-[#bd9245]"
                        />
                        <label htmlFor="isActive" className="text-sm font-bold text-gray-700 uppercase tracking-widest">Active Banner</label>
                    </div>
                </div>

                <DialogFooter className="p-8 bg-gray-50/50 flex flex-col items-center gap-4">
                    {submitError && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{submitError}</p>}
                    <div className="flex gap-4 w-full justify-end">
                        <Button variant="ghost" onClick={handleClose} className="rounded-xl px-6 h-12 font-black uppercase text-xs tracking-widest">Cancel</Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-[#111827] hover:bg-[#bd9245] rounded-xl px-10 h-12 font-black uppercase text-xs tracking-widest shadow-xl transition-all"
                        >
                            {isSubmitting ? "Creating..." : "Create Banner"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBannerModal;
