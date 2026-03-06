"use client";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Upload } from "lucide-react";

interface ItineraryDay {
    id: string;
    day: number;
    title: string;
    description: string;
}

interface CreateTourModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTourCreated: (tourData: any) => void;
}

const CreateTourModal = ({ isOpen, onClose, onTourCreated }: CreateTourModalProps) => {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        about: "",
        price: "",
        duration: "",
        location: "",
        capacity: "",
        tourType: "Cultural",
        guideName: "",
        meetingPoint: "",
        groupSize: "",
    });

    const [highlights, setHighlights] = useState<string[]>([""]);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([
        { id: "1", day: 1, title: "Arrival", description: "Meeting at the point and start the tour." }
    ]);
    const [inclusions, setInclusions] = useState<string[]>([""]);
    const [exclusions, setExclusions] = useState<string[]>([""]);
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
        if (!formData.title || !formData.price || !formData.location) {
            setSubmitError("Title, price and location are required.");
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
                    body: JSON.stringify({ data: base64, folder: 'skygo/tours' }),
                });
                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    uploadedImages.push({ public_id: uploadData.public_id, url: uploadData.url, alt: formData.title });
                }
            }

            const payload = {
                ...formData,
                price: Number(formData.price),
                highlights: highlights.filter(h => h.trim() !== ""),
                itinerary: itinerary.filter(i => i.title.trim() !== ""),
                inclusions: inclusions.filter(i => i.trim() !== ""),
                exclusions: exclusions.filter(e => e.trim() !== ""),
                images: uploadedImages,
            };

            const res = await fetch('/api/tours', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                onTourCreated(data.data);
                handleClose();
            } else {
                setSubmitError(data.error || "Failed to create tour.");
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
            about: "",
            price: "",
            duration: "",
            location: "",
            capacity: "",
            tourType: "Cultural",
            guideName: "",
            meetingPoint: "",
            groupSize: "",
        });
        setHighlights([""]);
        setItinerary([{ id: "1", day: 1, title: "Arrival", description: "Meeting at the point and start the tour." }]);
        setInclusions([""]);
        setExclusions([""]);
        setImages([]);
        setSubmitError("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border-none shadow-2xl p-0 bg-white">
                <DialogHeader className="p-8 pb-4 bg-gray-50/50">
                    <DialogTitle className="text-3xl font-black text-[#111827] uppercase tracking-tighter">Add New Tour</DialogTitle>
                    <DialogDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Create a dedicated tour experience with specific parameters.</DialogDescription>
                </DialogHeader>

                <div className="p-8 space-y-8">
                    {/* Basic Info */}
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#111827]">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tour Title</label>
                                <Input placeholder="e.g. Table Mountain Walking Tour" value={formData.title} onChange={e => handleInputChange("title", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (ZAR)</label>
                                <Input type="number" placeholder="e.g. 1500" value={formData.price} onChange={e => handleInputChange("price", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subtitle</label>
                                <Input placeholder="e.g. A panoramic journey to the top of Cape Town" value={formData.subtitle} onChange={e => handleInputChange("subtitle", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tour Type</label>
                                <Select value={formData.tourType} onValueChange={val => handleInputChange("tourType", val)}>
                                    <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {['Walking', 'Bus', 'Boat', 'Air', 'Adventure', 'Cultural', 'Wildlife', 'Luxury'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Duration</label>
                                <Input placeholder="e.g. 4 Hours / 1 Day" value={formData.duration} onChange={e => handleInputChange("duration", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Location</label>
                                <Input placeholder="e.g. Cape Town, South Africa" value={formData.location} onChange={e => handleInputChange("location", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Group Size</label>
                                <Input placeholder="e.g. 12 Persons Max" value={formData.groupSize} onChange={e => handleInputChange("groupSize", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Specific Params */}
                    <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-[#111827]">Tour Logistics</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Guide Name</label>
                                <Input placeholder="e.g. John Doe" value={formData.guideName} onChange={e => handleInputChange("guideName", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Meeting Point</label>
                                <Input placeholder="e.g. V&A Waterfront Clock Tower" value={formData.meetingPoint} onChange={e => handleInputChange("meetingPoint", e.target.value)} className="h-12 rounded-xl" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">About Tour</label>
                                <Textarea placeholder="Detailed description of the tour..." value={formData.about} onChange={e => handleInputChange("about", e.target.value)} className="min-h-[120px] rounded-xl pt-3" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dynamic Sections: Highlights, Inclusions, Exclusions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Highlights</label>
                            {highlights.map((h, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    <Input value={h} onChange={e => {
                                        const newH = [...highlights];
                                        newH[i] = e.target.value;
                                        setHighlights(newH);
                                    }} className="h-10 rounded-xl" />
                                    {highlights.length > 1 && <Button variant="ghost" size="icon" onClick={() => setHighlights(highlights.filter((_, idx) => idx !== i))}><Minus /></Button>}
                                </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => setHighlights([...highlights, ""])} className="w-full rounded-xl"><Plus className="h-4 w-4 mr-2" /> Add Highlight</Button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Images</label>
                            <div className="border-2 border-dashed border-gray-100 rounded-3xl p-8 text-center cursor-pointer hover:border-[#bd9245] transition-colors" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Tour Images ({images.length} selected)</p>
                                <input type="file" multiple hidden ref={fileInputRef} onChange={e => setImages(Array.from(e.target.files || []))} accept="image/*" />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-8 bg-gray-50/50 flex flex-col items-center gap-4">
                    {submitError && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">{submitError}</p>}
                    <div className="flex gap-4 w-full justify-end">
                        <Button variant="ghost" onClick={handleClose} className="rounded-2xl px-8 h-12 font-black uppercase text-xs tracking-widest">Cancel</Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#111827] hover:bg-[#bd9245] rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-widest shadow-xl transition-all">
                            {isSubmitting ? "Publishing..." : "Publish Tour"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTourModal;
