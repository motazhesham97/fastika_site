'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Store } from '@/entities/store/model';
import { toggleStoreStatus, deleteStore } from '@/entities/store/api/mutations';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Card, CardContent } from '@/shared/ui/card';
import { Loader2, Pencil, Power, Trash2, MapPin, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { toast } from 'sonner';

interface StoreTableProps {
  stores: Store[];
}

export default function StoreTable({ stores }: StoreTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);

  const handleToggleStatus = async (store: Store) => {
    setLoadingId(store.id);
    try {
      await toggleStoreStatus(store.id, !store.is_active);
      toast.success(
        store.is_active
          ? `تم تعطيل "${store.name}" بنجاح`
          : `تم تفعيل "${store.name}" بنجاح`
      );
      router.refresh();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('فشل في تغيير حالة نقطة البيع');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!storeToDelete) return;

    setLoadingId(storeToDelete.id);
    try {
      await deleteStore(storeToDelete.id);
      toast.success(`تم حذف "${storeToDelete.name}" بنجاح`);
      setDeleteDialogOpen(false);
      setStoreToDelete(null);
      router.refresh();
    } catch (error) {
      console.error('Error deleting store:', error);
      toast.error('فشل في حذف نقطة البيع');
    } finally {
      setLoadingId(null);
    }
  };

  const openDeleteDialog = (store: Store) => {
    setStoreToDelete(store);
    setDeleteDialogOpen(true);
  };

  if (stores.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
          </div>
          <p className="text-muted-foreground text-lg mb-4">لا توجد نقاط بيع</p>
          <Link href="/stores/add">
            <Button className="bg-brand hover:bg-brand-dark transition-colors">
              إضافة نقطة بيع جديدة
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم البقالة</TableHead>
                  <TableHead className="text-right">العنوان</TableHead>
                  <TableHead className="text-right">الإحداثيات</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-semibold">{store.name}</TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">{store.address}</TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono" dir="ltr">
                      {store.latitude.toFixed(4)}, {store.longitude.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={store.is_active ? 'default' : 'secondary'}
                        className={store.is_active ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-400'}
                      >
                        {store.is_active ? 'نشط' : 'معطل'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Link href={`/stores/${store.id}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            aria-label={`تعديل ${store.name}`}
                            className="transition-colors"
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </Link>

                        <Button
                          variant={store.is_active ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => handleToggleStatus(store)}
                          disabled={loadingId === store.id}
                          className={!store.is_active ? 'bg-brand hover:bg-brand-dark' : ''}
                          aria-label={store.is_active ? `تعطيل ${store.name}` : `تفعيل ${store.name}`}
                        >
                          {loadingId === store.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          ) : (
                            <Power className="w-4 h-4" aria-hidden="true" />
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(store)}
                          className="text-destructive hover:bg-red-50 transition-colors"
                          aria-label={`حذف ${store.name}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" aria-hidden="true" />
              </div>
              <DialogTitle className="text-lg">تأكيد الحذف</DialogTitle>
            </div>
            <DialogDescription>
              هل أنت متأكد من حذف نقطة البيع &quot;{storeToDelete?.name}&quot;؟
              <br />
              <span className="text-destructive font-medium">لا يمكن التراجع عن هذا الإجراء.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loadingId === storeToDelete?.id}
            >
              {loadingId === storeToDelete?.id ? (
                <>
                  <Loader2 className="w-4 h-4 ms-2 animate-spin" aria-hidden="true" />
                  جاري الحذف...
                </>
              ) : (
                'حذف'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
