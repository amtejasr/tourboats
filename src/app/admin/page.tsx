
'use client';

import Link from 'next/link';
import { PlusCircle, Sailboat, Waves, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/context/DataContext';

export default function AdminPage() {
  const { yachts, waterActivities, deleteListing } = useData();

  const allListings = [
    ...yachts.map(y => ({ ...y, type: 'Yacht', typeSlug: 'yacht' })),
    ...waterActivities.map(a => ({ ...a, name: a.name, type: 'Activity', typeSlug: 'activity' }))
  ];
  
  const handleDelete = (id: string, type: 'yacht' | 'waterActivity') => {
      if(confirm(`Are you sure you want to delete this ${type}?`)) {
          deleteListing(id, type);
      }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-2xl">Admin Control Panel</CardTitle>
                <CardDescription>Manage your yacht and water activity listings.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/add-listing">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Listing
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allListings.map((item) => (
              <TableRow key={`${item.type}-${item.id}`}>
                <TableCell>
                  <Badge variant={item.type === 'Yacht' ? 'default' : 'secondary'}>
                    <div className="flex items-center">
                        {item.type === 'Yacht' ? <Sailboat className="h-4 w-4 mr-1" /> : <Waves className="h-4 w-4 mr-1" />}
                        {item.type}
                    </div>
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/edit/${item.typeSlug}/${item.id}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id, item.typeSlug as 'yacht' | 'waterActivity')}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
