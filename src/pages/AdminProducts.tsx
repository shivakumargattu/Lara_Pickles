
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin-login');
      return;
    }

    // Load products (mock data for now)
    const mockProducts = [
      {
        id: 1,
        name: "Classic Dill Pickles",
        price: 8.99,
        category: "dill",
        description: "Traditional dill pickles with a perfect crunch",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Spicy Jalapeño Pickles",
        price: 9.99,
        category: "spicy",
        description: "Fire up your taste buds with these spicy pickles",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Sweet Bread & Butter",
        price: 7.99,
        category: "sweet",
        description: "Sweet and tangy with a hint of onion",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        name: "Garlic Kosher Pickles",
        price: 9.49,
        category: "dill",
        description: "Rich garlic flavor in every bite",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        name: "Spicy Habanero Heat",
        price: 11.99,
        category: "spicy",
        description: "For the brave! Intense habanero heat",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        name: "Honey Mustard Pickles",
        price: 8.49,
        category: "sweet",
        description: "Unique blend of honey and mustard",
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      }
    ];
    setProducts(mockProducts);
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      id: editingProduct ? editingProduct.id : Date.now(),
      image: formData.image || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
    };

    if (editingProduct) {
      // Update product
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
    } else {
      // Add new product
      setProducts([...products, productData]);
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your pickle products</p>
          </div>
          <Button 
            onClick={() => navigate('/admin')}
            variant="outline"
            className="border-green-600 text-green-600"
          >
            ← Back to Dashboard
          </Button>
        </div>

        {/* Add Product Button */}
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openAddDialog}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dill">Dill Pickles</SelectItem>
                      <SelectItem value="spicy">Spicy Pickles</SelectItem>
                      <SelectItem value="sweet">Sweet Pickles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Image</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Category</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600 max-w-xs truncate">
                            {product.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 font-medium">${product.price}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => openEditDialog(product)}
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(product.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminProducts;
