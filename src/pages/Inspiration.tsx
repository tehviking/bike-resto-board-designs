import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface InspirationPhoto {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

const Inspiration = () => {
  const [photos, setPhotos] = useState<InspirationPhoto[]>([
    {
      id: "1",
      name: "candy-apple-red.jpg",
      url: "/placeholder.svg",
      uploadedAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "matte-black-finish.jpg",
      url: "/placeholder.svg",
      uploadedAt: "2024-01-10"
    },
    {
      id: "3",
      name: "vintage-blue-metallic.jpg", 
      url: "/placeholder.svg",
      uploadedAt: "2024-01-08"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          const newPhoto: InspirationPhoto = {
            id: crypto.randomUUID(),
            name: file.name,
            url: reader.result as string,
            uploadedAt: new Date().toISOString().split('T')[0]
          };
          setPhotos(prev => [newPhoto, ...prev]);
          toast.success(`Added ${file.name} to inspiration gallery`);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(`${file.name} is not a valid image file`);
      }
    });
    
    // Reset input
    event.target.value = '';
  };

  const handleDelete = (photoId: string) => {
    const photo = photos.find(p => p.id === photoId);
    setPhotos(prev => prev.filter(p => p.id !== photoId));
    toast.success(`Removed ${photo?.name} from inspiration gallery`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Paint Job Inspiration</h1>
        <p className="text-muted-foreground">
          Save photos of paint schemes and finishes for future restoration projects
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Inspiration Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="photo-upload" className="block">
              Select images to add to your inspiration gallery
            </Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG, GIF, WebP. You can select multiple files.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Inspiration Gallery ({photos.length} photos)
        </h2>
        
        {photos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No inspiration photos yet</h3>
              <p className="text-muted-foreground">
                Upload some photos to start building your inspiration gallery
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => handleDelete(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm truncate mb-1">{photo.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Added {photo.uploadedAt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspiration;