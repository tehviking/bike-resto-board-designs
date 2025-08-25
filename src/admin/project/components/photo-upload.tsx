import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Upload, X, Camera, Eye } from "lucide-react"
import { useState } from "react"

interface Photo {
  id: string
  filename: string
  url: string
  caption: string
  uploadedAt: string
}

interface PhotoUploadProps {
  projectId: string
}

// Mock data
const mockPhotos: Photo[] = [
  {
    id: "1",
    filename: "before-restoration.jpg",
    url: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop",
    caption: "Initial condition - before restoration",
    uploadedAt: "2024-01-15"
  },
  {
    id: "2",
    filename: "frame-stripped.jpg", 
    url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop",
    caption: "Frame after paint stripping",
    uploadedAt: "2024-01-18"
  },
  {
    id: "3",
    filename: "components-layout.jpg",
    url: "https://images.unsplash.com/photo-1544191696-15693072b8be?w=400&h=300&fit=crop", 
    caption: "Component layout planning",
    uploadedAt: "2024-01-20"
  }
]

export function PhotoUpload({ projectId }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handleDelete = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Project Photos
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Form */}
        <Card className="border-dashed border-2">
          <CardContent className="pt-4">
            <form method="post" action={`/admin/projects/${projectId}/photos`} encType="multipart/form-data" className="space-y-4">
              <div className="flex items-center justify-center">
                <Label htmlFor="photo_file" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-muted rounded-lg hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">Click to upload photos</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                  </div>
                </Label>
                <Input 
                  id="photo_file"
                  name="photo[file]" 
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo_caption">Caption (optional)</Label>
                <Input 
                  id="photo_caption"
                  name="photo[caption]" 
                  placeholder="Describe this photo..."
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Upload className="h-4 w-4" />
                Upload Photos
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Photo Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="group relative overflow-hidden">
                <AspectRatio ratio={4/3}>
                  <img 
                    src={photo.url} 
                    alt={photo.caption || photo.filename}
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <form method="post" action={`/admin/projects/${projectId}/photos/${photo.id}`} className="inline">
                        <input type="hidden" name="_method" value="delete" />
                        <Button 
                          type="submit"
                          size="sm" 
                          variant="destructive"
                          onClick={(e) => {
                            e.preventDefault()
                            if (confirm('Are you sure you want to delete this photo?')) {
                              handleDelete(photo.id)
                            }
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </AspectRatio>
                
                {/* Caption */}
                {photo.caption && (
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">{photo.caption}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(photo.uploadedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No photos uploaded yet.</p>
            <p className="text-sm">Upload photos to track project progress.</p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="max-w-4xl max-h-full relative">
              <Button 
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4 z-10"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption || selectedPhoto.filename}
                className="max-w-full max-h-full object-contain"
              />
              {selectedPhoto.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                  <p>{selectedPhoto.caption}</p>
                  <p className="text-sm text-gray-300">
                    {selectedPhoto.filename} • {new Date(selectedPhoto.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}