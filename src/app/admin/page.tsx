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
import { yachts, waterActivities } from '@/lib/data';

export default function AdminPage() {
  const allListings = [
    ...yachts.map(y => ({ ...y, type: 'Yacht' })),
    ...waterActivities.map(a => ({ ...a, name: a.name, type: 'Activity' }))
  ];

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
                  <Button variant="ghost" size="icon" disabled>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled>
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
