import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ListingForm } from '@/components/admin/ListingForm';

export default function AddListingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Add New Listing</CardTitle>
        <CardDescription>
          Fill in the details for a new yacht or water activity. Use the AI tool to generate a compelling description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ListingForm />
      </CardContent>
    </Card>
  );
}
