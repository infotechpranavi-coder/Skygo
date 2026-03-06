"use client";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTicketCreated: (ticketData: any) => void;
}

const CreateTicketModal = ({ isOpen, onClose, onTicketCreated }: CreateTicketModalProps) => {
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
    });

    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = e => reject(e);
        });

    const handleSubmit = async () => {
        if (!formData.title || !formData.price || !formData.carrier || !formData.route) {
            setSubmitError("Title, Carrier, Route and Price are required.");
            return;
        }
        setIsSubmitting(true);
        setSubmitError("");
        try {
            const uploadedImages: Array<{ public_id: string; url: string; alt: string }> = [];
            for (const file of images) {
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

            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                onTicketCreated(data.data);
                handleClose();
            } else {
                setSubmitError(data.error || "Failed to create ticket.");
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
        });
        setImages([]);
        setSubmitError("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border-none shadow-2xl p-0 bg-white">
                <DialogHeader className="p-8 pb-4 bg-gray-50/50">
                    <DialogTitle className="text-3xl font-black text-[#111827] uppercase tracking-tighter">Add Airline Ticket</DialogTitle>
                    <DialogDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Manage flight inventory with dedicated airline parameters.</DialogDescription>
                </DialogHeader>

                <div className="p-8 space-y-8">
                    {/* Flight Info */}
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#111827]">Flight Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Entry Title</label>
                                <Input placeholder="e.g. Cape Town to Dubai - Emirates" value={formData.title} onChange={e => handleInputChange("title", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Carrier (Airline)</label>
                                <Input placeholder="e.g. Emirates" value={formData.carrier} onChange={e => handleInputChange("carrier", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (ZAR)</label>
                                <Input type="number" placeholder="e.g. 12000" value={formData.price} onChange={e => handleInputChange("price", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Route</label>
                                <Input placeholder="e.g. CPT - DXB - LHR" value={formData.route} onChange={e => handleInputChange("route", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Travel Class</label>
                                <Select value={formData.travelClass} onValueChange={val => handleInputChange("travelClass", val)}>
                                    <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {['Economy', 'Premium Economy', 'Business', 'First'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Destination City</label>
                                <Input placeholder="e.g. London" value={formData.location} onChange={e => handleInputChange("location", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Validity</label>
                                <Input placeholder="e.g. 30 Days" value={formData.validity} onChange={e => handleInputChange("validity", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Schedule & Policy */}
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#111827]">Schedule & Policy</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Departure Time</label>
                                <Input placeholder="e.g. 10:30 AM" value={formData.departureTime} onChange={e => handleInputChange("departureTime", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Arrival Time</label>
                                <Input placeholder="e.g. 05:45 PM" value={formData.arrivalTime} onChange={e => handleInputChange("arrivalTime", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Luggage Allowance</label>
                                <Input placeholder="e.g. 2 x 23kg" value={formData.luggageAllowance} onChange={e => handleInputChange("luggageAllowance", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Refund Policy</label>
                                <Input placeholder="e.g. Partially Refundable" value={formData.refundPolicy} onChange={e => handleInputChange("refundPolicy", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Additional Description</label>
                                <Textarea placeholder="Any other flight details..." value={formData.description} onChange={e => handleInputChange("description", e.target.value)} className="min-h-[100px] rounded-xl pt-3" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Promo Images</label>
                        <div className="border-2 border-dashed border-gray-100 rounded-3xl p-8 text-center cursor-pointer hover:border-[#bd9245] transition-colors" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Upload Ticket Promo ({images.length} selected)</p>
                            <input type="file" multiple hidden ref={fileInputRef} onChange={e => setImages(Array.from(e.target.files || []))} accept="image/*" />
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-8 bg-gray-50/50 flex flex-col items-center gap-4">
                    {submitError && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{submitError}</p>}
                    <div className="flex gap-4 w-full justify-end">
                        <Button variant="ghost" onClick={handleClose} className="rounded-2xl px-8 h-12 font-black uppercase text-xs tracking-widest">Cancel</Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#111827] hover:bg-[#bd9245] rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-widest shadow-xl transition-all">
                            {isSubmitting ? "Publishing..." : "Publish Ticket"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTicketModal;
