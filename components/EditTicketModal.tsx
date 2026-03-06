"use client";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { TicketData } from "@/lib/types";

interface EditTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTicketUpdated: (ticketData: TicketData) => void;
    ticketData: TicketData | null;
}

const EditTicketModal = ({ isOpen, onClose, onTicketUpdated, ticketData }: EditTicketModalProps) => {
    const [formData, setFormData] = useState({
        title: "",
        carrier: "",
        route: "",
        price: "",
        travelClass: "Economy",
        departureTime: "",
        arrivalTime: "",
        luggageAllowance: "",
        refundPolicy: "",
        validity: "",
        location: "",
        description: "",
        isAvailable: true,
    });

    const [existingImages, setExistingImages] = useState<any[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (ticketData) {
            setFormData({
                title: ticketData.title || "",
                carrier: ticketData.carrier || "",
                route: ticketData.route || "",
                price: ticketData.price?.toString() || "",
                travelClass: ticketData.travelClass || "Economy",
                departureTime: ticketData.departureTime || "",
                arrivalTime: ticketData.arrivalTime || "",
                luggageAllowance: ticketData.luggageAllowance || "",
                refundPolicy: ticketData.refundPolicy || "",
                validity: ticketData.validity || "",
                location: ticketData.location || "",
                description: ticketData.description || "",
                isAvailable: ticketData.isAvailable ?? true,
            });
            setExistingImages(ticketData.images || []);
            setNewImages([]);
        }
    }, [ticketData]);

    const handleInputChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = e => reject(e);
        });

    const handleSubmit = async () => {
        if (!formData.title || !formData.price || !ticketData) {
            setSubmitError("Title and price are required.");
            return;
        }
        setIsSubmitting(true);
        setSubmitError("");
        try {
            const uploadedImages = [...existingImages];
            for (const file of newImages) {
                const base64 = await fileToBase64(file);
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64, folder: 'skygo/tickets' }),
                });
                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    uploadedImages.push({ public_id: uploadData.public_id, url: uploadData.url, alt: formData.title });
                }
            }

            const payload = {
                ...formData,
                price: Number(formData.price),
                images: uploadedImages,
            };

            const res = await fetch(`/api/tickets/${ticketData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                onTicketUpdated(data.data);
                onClose();
            } else {
                setSubmitError(data.error || "Failed to update ticket.");
            }
        } catch (err: any) {
            setSubmitError(err.message || "An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border-none shadow-2xl p-0 bg-white">
                <DialogHeader className="p-8 pb-4 bg-gray-50/50">
                    <DialogTitle className="text-3xl font-black text-[#111827] uppercase tracking-tighter">Edit Ticket</DialogTitle>
                    <DialogDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Update airline ticket parameters.</DialogDescription>
                </DialogHeader>

                <div className="p-8 space-y-8">
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#111827]">Flight Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Title</label>
                                <Input value={formData.title} onChange={e => handleInputChange("title", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Carrier</label>
                                <Input value={formData.carrier} onChange={e => handleInputChange("carrier", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price</label>
                                <Input type="number" value={formData.price} onChange={e => handleInputChange("price", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Route</label>
                                <Input value={formData.route} onChange={e => handleInputChange("route", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Class</label>
                                <Select value={formData.travelClass} onValueChange={val => handleInputChange("travelClass", val)}>
                                    <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {['Economy', 'Premium Economy', 'Business', 'First'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#111827]">Images</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-wrap gap-4">
                            {existingImages.map((img, i) => (
                                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden group">
                                    <img src={img.url} className="w-full h-full object-cover" alt="" />
                                    <button onClick={() => setExistingImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                                </div>
                            ))}
                            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center cursor-pointer hover:border-[#bd9245]" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="h-6 w-6 text-gray-300" />
                            </div>
                            <input type="file" multiple hidden ref={fileInputRef} onChange={e => setNewImages(prev => [...prev, ...Array.from(e.target.files || [])])} accept="image/*" />
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter className="p-8 bg-gray-50/50 flex flex-col items-center gap-4">
                    {submitError && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{submitError}</p>}
                    <div className="flex gap-4 w-full justify-end">
                        <Button variant="ghost" onClick={onClose} className="rounded-2xl px-8 h-12 font-black uppercase text-xs tracking-widest">Cancel</Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#111827] hover:bg-[#bd9245] rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-widest shadow-xl transition-all">
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditTicketModal;
