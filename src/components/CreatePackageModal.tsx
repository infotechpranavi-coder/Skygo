import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X, Upload, Star, Info, Sparkles, Calendar, Heart, ShieldCheck, Clock } from "lucide-react";

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  descriptions: string[];
}

interface InclusionExclusionCategory {
  id: string;
  category: string;
  items: string[];
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPackageCreated: (packageData: any) => void;
}

const CreatePackageModal = ({ isOpen, onClose, onPackageCreated }: CreatePackageModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    ideaFor: "",
    about: "Premium Sky Go Tours is a specialized travel management company dedicated to crafting exceptional journeys across dynamic destinations. With years of local expertise and a passion for service excellence, we transform ordinary trips into grand experiences.",
    services: "Customized travel planning, Guided tours & local experiences, Group & family vacations, Luxury & adventure travel, Honeymoons & romantic getaways, Corporate & incentive travel",
    tourDetails: "This carefully curated package offers a perfect blend of iconic landmarks, cultural immersion, and leisure activities. Every detail has been planned to ensure maximum comfort and an unforgettable experience.",
    abstract: "",
    tourOverview: "",
    price: "",
    duration: "",
    location: "",
    capacity: "",
    packageType: "international",
    place: "dubai",
    packageCategory: "Regular",
    bestTimeToVisit: {
      yearRound: "This destination can be visited throughout the year.",
      winter: "Pleasant outdoor conditions from November to March.",
      summer: "Better value with lower costs and optimized indoor sightseeing."
    },
  });

  const [keyHighlights, setKeyHighlights] = useState<string[]>([""]);
  const [hotelOptions, setHotelOptions] = useState<string[]>(["Deluxe Package: 3★ hotels", "Gold Package: 4★ hotels", "Platinum Package: 5★ hotels"]);
  const [whyChooseThisTrip, setWhyChooseThisTrip] = useState<string[]>(["Well-balanced itinerary", "Transparent pricing", "Licensed local operators"]);
  const [whyPremiumDubaiTours, setWhyPremiumDubaiTours] = useState<string[]>(["Dedicated customer support", "Flexible hotel options", "Experienced multi-lingual guides"]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: "1", day: 1, title: "Arrival & Transfer", descriptions: ["Greeting at airport", "Private transfer to hotel", "Evening at leisure"] }
  ]);
  const [inclusions, setInclusions] = useState<InclusionExclusionCategory[]>([
    { id: "1", category: "General", items: ["Airport transfers", "Daily breakfast", "Sightseeing tours"] }
  ]);
  const [exclusions, setExclusions] = useState<InclusionExclusionCategory[]>([
    { id: "1", category: "General", items: ["International airfare", "Visa fees", "Personal expenses"] }
  ]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = () => {
    setReviews([...reviews, { name: "", rating: 5, comment: "", date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }]);
  };

  const updateReview = (index: number, field: keyof Review, value: string | number) => {
    const newReviews = [...reviews];
    newReviews[index] = { ...newReviews[index], [field]: value } as Review;
    setReviews(newReviews);
  };
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBestTimeChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      bestTimeToVisit: {
        ...prev.bestTimeToVisit,
        [field]: value
      }
    }));
  };

  const addItineraryDay = () => {
    const newDay = itinerary.length + 1;
    setItinerary(prev => [
      ...prev,
      { id: Date.now().toString(), day: newDay, title: "", descriptions: [""] }
    ]);
  };

  const addItineraryDescription = (dayId: string) => {
    setItinerary(prev => prev.map(day =>
      day.id === dayId ? { ...day, descriptions: [...day.descriptions, ""] } : day
    ));
  };

  const updateItineraryDescription = (dayId: string, index: number, value: string) => {
    setItinerary(prev => prev.map(day =>
      day.id === dayId ? {
        ...day,
        descriptions: day.descriptions.map((desc, i) => i === index ? value : desc)
      } : day
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  // Helper: convert File → base64 data URI
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
    });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    if (!formData.title || !formData.price) {
      alert("Please enter title and price at minimum.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // 1. Upload each image to Cloudinary
      let uploadedImages: Array<{ public_id: string; url: string; alt: string }> = [];
      if (images.length > 0) {
        for (const file of images) {
          const base64 = await fileToBase64(file);
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: base64, folder: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER || 'skygo/packages' })
          });
          const uploadData = await uploadRes.json();
          if (!uploadData.success) throw new Error(`Image upload failed: ${uploadData.error}`);
          uploadedImages.push({
            public_id: uploadData.public_id,
            url: uploadData.url,
            alt: formData.title
          });
        }
      }

      // 2. Build the complete package payload
      const packagePayload = {
        ...formData,
        price: parseFloat(formData.price as string),
        keyHighlights: keyHighlights.filter(h => h.trim()),
        hotelOptions: hotelOptions.filter(h => h.trim()),
        whyChooseThisTrip: whyChooseThisTrip.filter(w => w.trim()),
        whyPremiumDubaiTours: whyPremiumDubaiTours.filter(w => w.trim()),
        itinerary: itinerary.map(day => ({
          day: day.day,
          title: day.title,
          description: day.descriptions.filter(d => d.trim()).join("\n")
        })),
        inclusions: inclusions.map(inc => ({
          category: inc.category,
          items: inc.items.filter(i => i.trim())
        })),
        exclusions: exclusions.map(exc => ({
          category: exc.category,
          items: exc.items.filter(i => i.trim())
        })),
        reviews,
        images: uploadedImages,
        transportation: [],
        accommodation: [],
        bookings: 0,
        rating: 0,
      };

      // 3. Save to MongoDB via API
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packagePayload)
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save package');
      }

      // 4. Pass the newly saved package back to the dashboard
      onPackageCreated(result.data);
      handleClose();
    } catch (err: any) {
      console.error('Package creation error:', err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset state and close
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 border-none">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <DialogHeader className="p-8 bg-gray-900 text-white">
            <DialogTitle className="text-3xl font-black tracking-tight">Create Luxury Package</DialogTitle>
            <DialogDescription className="text-gray-400">Add a new grand experience to Sky Go tours catalog.</DialogDescription>
          </DialogHeader>

          <div className="p-8 space-y-10">
            {/* Core Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Basic Information</label>
                <div className="space-y-4">
                  <Input placeholder="Package Title" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} />
                  <Input placeholder="Subtitle (e.g. 6 Nights / 7 Days)" value={formData.subtitle} onChange={(e) => handleInputChange('subtitle', e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="number" placeholder="Price (Numeric)" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                    <Input placeholder="Location (e.g. Dubai, UAE)" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Classifications</label>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={formData.packageType} onValueChange={(v) => handleInputChange('packageType', v)}>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="international">International</SelectItem>
                      <SelectItem value="domestic">Domestic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={formData.packageCategory} onValueChange={(v) => handleInputChange('packageCategory', v)}>
                    <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="Specific Place Slug (e.g. dubai)" value={formData.place} onChange={(e) => handleInputChange('place', e.target.value)} />
                <Input placeholder="Duration (e.g. 6 Nights / 7 Days)" value={formData.duration} onChange={(e) => handleInputChange('duration', e.target.value)} />
              </div>
            </div>

            {/* Rich Content Fields */}
            <div className="space-y-6">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Rich Description Fields</label>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="text-sm font-bold block mb-2">Idea For</label>
                  <Input placeholder="Who is this ideal for?" value={formData.ideaFor} onChange={(e) => handleInputChange('ideaFor', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Abstract (Brief Summary)</label>
                  <Textarea placeholder="Short hook summary..." value={formData.abstract} onChange={(e) => handleInputChange('abstract', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Tour Overview (Detailed Story)</label>
                  <Textarea placeholder="The narrative of the tour..." value={formData.tourOverview} onChange={(e) => handleInputChange('tourOverview', e.target.value)} rows={4} />
                </div>
              </div>
            </div>

            {/* Dynamic Array Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Highlights */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Key Highlights</label>
                  <Button variant="ghost" size="sm" onClick={() => setKeyHighlights([...keyHighlights, ""])}><Plus className="h-4 w-4" /></Button>
                </div>
                {keyHighlights.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={h} onChange={(e) => {
                      const newArr = [...keyHighlights];
                      newArr[i] = e.target.value;
                      setKeyHighlights(newArr);
                    }} />
                    <Button variant="ghost" size="icon" onClick={() => setKeyHighlights(keyHighlights.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>

              {/* Hotel Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Hotel Tier Options</label>
                  <Button variant="ghost" size="sm" onClick={() => setHotelOptions([...hotelOptions, ""])}><Plus className="h-4 w-4" /></Button>
                </div>
                {hotelOptions.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={h} onChange={(e) => {
                      const newArr = [...hotelOptions];
                      newArr[i] = e.target.value;
                      setHotelOptions(newArr);
                    }} />
                    <Button variant="ghost" size="icon" onClick={() => setHotelOptions(hotelOptions.filter((_, idx) => idx !== i))}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Time to Visit */}
            <div className="space-y-4 p-6 bg-orange-50/50 rounded-xl border border-orange-100">
              <label className="text-sm font-bold flex items-center gap-2"><Calendar className="h-4 w-4 text-orange-500" /> Best Time to Visit Settings</label>
              <div className="space-y-4">
                <Input placeholder="Year Round Note" value={formData.bestTimeToVisit.yearRound} onChange={(e) => handleBestTimeChange('yearRound', e.target.value)} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Textarea placeholder="Winter Description" value={formData.bestTimeToVisit.winter} onChange={(e) => handleBestTimeChange('winter', e.target.value)} />
                  <Textarea placeholder="Summer Description" value={formData.bestTimeToVisit.summer} onChange={(e) => handleBestTimeChange('summer', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /> Daily Itinerary Schedule</label>
                <Button onClick={addItineraryDay} variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" /> Add Day</Button>
              </div>
              <div className="space-y-4">
                {itinerary.map((day) => (
                  <Card key={day.id} className="border-gray-200">
                    <CardHeader className="py-3 px-6 bg-gray-50 flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-sm font-black">Day {day.day}</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500" onClick={() => setItinerary(itinerary.filter(d => d.id !== day.id))}><Minus className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <Input placeholder="Day Title" value={day.title} onChange={(e) => {
                        setItinerary(itinerary.map(d => d.id === day.id ? { ...d, title: e.target.value } : d));
                      }} />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-500">Activity Bullet Points</label>
                          <Button variant="ghost" size="sm" onClick={() => addItineraryDescription(day.id)}><Plus className="h-3 w-3" /></Button>
                        </div>
                        {day.descriptions.map((desc, idx) => (
                          <div key={idx} className="flex gap-2">
                            <Textarea className="min-h-[60px]" placeholder="Activity description..." value={desc} onChange={(e) => updateItineraryDescription(day.id, idx, e.target.value)} />
                            <Button variant="ghost" size="icon" onClick={() => {
                              setItinerary(itinerary.map(d => d.id === day.id ? { ...d, descriptions: d.descriptions.filter((_, j) => j !== idx) } : d));
                            }}><X className="h-3 w-3" /></Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-emerald-600">Inclusions</label>
                  <Button variant="ghost" size="sm" onClick={() => setInclusions([...inclusions, { id: Date.now().toString(), category: "", items: [""] }])}><Plus className="h-4 w-4" /></Button>
                </div>
                {inclusions.map((inc) => (
                  <div key={inc.id} className="p-4 border border-emerald-100 bg-emerald-50/20 rounded-lg space-y-3">
                    <Input placeholder="Category" value={inc.category} onChange={(e) => setInclusions(inclusions.map(i => i.id === inc.id ? { ...i, category: e.target.value } : i))} />
                    {inc.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input className="h-8 text-xs" value={item} onChange={(e) => {
                          setInclusions(inclusions.map(i => i.id === inc.id ? { ...i, items: i.items.map((itm, j) => j === idx ? e.target.value : itm) } : i));
                        }} />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                          setInclusions(inclusions.map(i => i.id === inc.id ? { ...i, items: i.items.filter((_, j) => j !== idx) } : i));
                        }}><X className="h-3 w-3" /></Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full h-8 text-xs" onClick={() => {
                      setInclusions(inclusions.map(i => i.id === inc.id ? { ...i, items: [...i.items, ""] } : i));
                    }}><Plus className="h-3 w-3 mr-1" /> Add Item</Button>
                  </div>
                ))}
              </div>

              {/* Exclusions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-rose-600">Exclusions</label>
                  <Button variant="ghost" size="sm" onClick={() => setExclusions([...exclusions, { id: Date.now().toString(), category: "", items: [""] }])}><Plus className="h-4 w-4" /></Button>
                </div>
                {exclusions.map((exc) => (
                  <div key={exc.id} className="p-4 border border-rose-100 bg-rose-50/20 rounded-lg space-y-3">
                    <Input placeholder="Category" value={exc.category} onChange={(e) => setExclusions(exclusions.map(i => i.id === exc.id ? { ...i, category: e.target.value } : i))} />
                    {exc.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input className="h-8 text-xs" value={item} onChange={(e) => {
                          setExclusions(exclusions.map(i => i.id === exc.id ? { ...i, items: i.items.map((itm, j) => j === idx ? e.target.value : itm) } : i));
                        }} />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                          setExclusions(exclusions.map(i => i.id === exc.id ? { ...i, items: i.items.filter((_, j) => j !== idx) } : i));
                        }}><X className="h-3 w-3" /></Button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full h-8 text-xs" onClick={() => {
                      setExclusions(exclusions.map(i => i.id === exc.id ? { ...i, items: [...i.items, ""] } : i));
                    }}><Plus className="h-3 w-3 mr-1" /> Add Item</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images Upload Placeholder */}
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <Upload className="h-10 w-10 text-gray-400" />
              <div className="text-center">
                <p className="font-bold">Visual Assets</p>
                <p className="text-sm text-gray-500">Upload up to 5 high-resolution images.</p>
              </div>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Choose Files</Button>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleImageUpload} />
              <div className="flex gap-2 mt-4">
                {images.map((f, i) => <Badge key={i} variant="secondary" className="flex items-center gap-1">{f.name} <X className="h-3 w-3 cursor-pointer" onClick={() => setImages(images.filter((_, idx) => idx !== i))} /></Badge>)}
              </div>
            </div>

            {/* Guest Reviews Section */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> Guest Reviews & Testimonials</label>
                <Button onClick={addReview} variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" /> Add Review</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, idx) => (
                  <Card key={idx} className="border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-100">
                      <span className="text-xs font-black uppercase text-gray-400">Reviewer {idx + 1}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500" onClick={() => setReviews(reviews.filter((_, i) => i !== idx))}><X className="h-3 w-3" /></Button>
                    </div>
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Guest Name" value={review.name} onChange={(e) => updateReview(idx, 'name', e.target.value)} />
                        <div className="flex items-center gap-2 bg-white border rounded-md px-2">
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          <input
                            type="number"
                            min="1" max="5"
                            className="w-full text-xs font-bold outline-none"
                            value={review.rating}
                            onChange={(e) => updateReview(idx, 'rating', parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      <Textarea placeholder="Share their experience..." value={review.comment} onChange={(e) => updateReview(idx, 'comment', e.target.value)} />
                      <Input placeholder="Date (e.g. 15 Oct 2024)" value={review.date} onChange={(e) => updateReview(idx, 'date', e.target.value)} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
            {submitError && (
              <p className="text-sm text-rose-600 font-medium text-center w-full">{submitError}</p>
            )}
            <div className="flex gap-4 w-full justify-end">
              <Button variant="outline" onClick={handleClose} disabled={isSubmitting} className="px-8 h-12 rounded-xl font-bold uppercase tracking-widest text-xs">Discard</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="px-10 h-12 bg-gray-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-gray-200">
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Saving...</span>
                ) : "Publish Package"}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackageModal;
