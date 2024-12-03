import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Card from "../components/Card";
import { LinkDTO, PhoneNumber } from "../stores/useUserLinks";
import { StaticImageData } from "next/image";
import noCards from "@/public/no-cards.svg";
import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";

export interface FileData {
  id: string;
  memberId: string;
  title: string;
  imageUrl: string;
  value: string;
  type: string;
}

export interface CardDetails {
  name: string;
  designation: string;
  profileImage: string | StaticImageData;
  bannerImages: FileData[];
  employeeId: string;
  profileUrl: string;
  isPrimaryCard?: boolean;
  links: LinkDTO[];
  mobileNumber?: PhoneNumber;
  whatsappNumber?: PhoneNumber;
  additionalImages: FileData[];
  directModeOn?: boolean;
  pdf?: FileData;
  isNfcActive?: boolean;
  isQrActive?: boolean;
  qrSerialNumber?: string;
  nfcSerialNumber?: string;
  qrActivatedDate?: string;
  nfcActivatedDate?: string;
}

interface Props {
  cards: CardDetails[];
}
const CardGrid = ({ cards }: Props) => {
  if (cards?.length < 1)
    return (
      <div className="flex flex-col items-center justify-center">
        <Image src={noCards} alt="no-cards" />
        <div className="text-center">
          <h1 className="text-4xl mb-2">Looks empty here!</h1>
          <p className="text-tSecondary">Add your first member now!</p>
          <Link href="/new">
            <Button width="180px" className="mt-8">
              Add Member
            </Button>
          </Link>
        </div>
      </div>
    );

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
      {cards?.map((card) => (
        <GridItem key={card.employeeId}>
          <Card card={card} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default CardGrid;
