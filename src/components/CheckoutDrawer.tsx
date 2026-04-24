import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@convex/_generated/api';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ShoppingCart, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
interface CheckoutDrawerProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}
export function CheckoutDrawer({ product, isOpen, onClose }: CheckoutDrawerProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.variants.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.variants.colors[0]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const placeOrderMutation = useMutation(api.orders.placeOrder);
  const handleCompletePurchase = async () => {
    setIsPurchasing(true);
    try {
      await placeOrderMutation({
        productId: product._id,
        size: selectedSize,
        color: selectedColor,
        total: product.price,
      });
      toast.success('تمت عملية الشراء بنجاح!', {
        description: `${product.title} (${selectedSize}, ${selectedColor})`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      });
      onClose();
    } catch (e: any) {
      toast.error('فشلت العملية', {
        description: e.message.includes("required") ? "يرجى تسجيل الدخول أولاً" : "حدث خطأ ما، يرجى المحاولة لاحقاً",
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
    } finally {
      setIsPurchasing(false);
    }
  };
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-white dark:bg-neutral-950 border-none shadow-2xl">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="flex flex-row items-center gap-4 border-b pb-4">
            <img src={product.posterUrl} alt={product.title} className="w-16 h-16 rounded-lg object-cover shadow-md" />
            <div className="text-left">
              <DrawerTitle className="text-xl font-bold">{product.title}</DrawerTitle>
              <p className="text-rose-600 font-bold text-lg">${product.price.toFixed(2)}</p>
            </div>
          </DrawerHeader>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Select Size</label>
              <ToggleGroup type="single" value={selectedSize} onValueChange={(v) => v && setSelectedSize(v)} className="justify-start gap-2">
                {product.variants.sizes.map((size: string) => (
                  <ToggleGroupItem key={size} value={size} className="border rounded-md px-4 py-2 data-[state=on]:bg-rose-600 data-[state=on]:text-white">
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Select Color</label>
              <ToggleGroup type="single" value={selectedColor} onValueChange={(v) => v && setSelectedColor(v)} className="justify-start flex-wrap gap-2">
                {product.variants.colors.map((color: string) => (
                  <ToggleGroupItem key={color} value={color} className="border rounded-md px-4 py-2 data-[state=on]:bg-rose-600 data-[state=on]:text-white">
                    {color}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-black">${product.price.toFixed(2)}</span>
              </div>
              <Button onClick={handleCompletePurchase} disabled={isPurchasing} className="w-full h-16 bg-rose-600 hover:bg-rose-700 text-white text-xl font-bold rounded-2xl shadow-xl active:scale-[0.98] transition-all">
                {isPurchasing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري المعالجة...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    إكمال الشراء
                  </div>
                )}
              </Button>
            </div>
          </div>
          <DrawerFooter className="pb-8">
            <Button variant="ghost" onClick={onClose}>إلغاء</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}