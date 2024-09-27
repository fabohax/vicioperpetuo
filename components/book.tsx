import Link from 'next/link';
import Image from 'next/image';

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  gender: string;
  isbn: string;
  year: number;
  pages: number;
  ratio: string;
  editorial: string;
  imgurl: string; // Ensure 'imgurl' is part of the Book type
};

interface Props {
  book: Book;
}

const BookDetails = ({ book }: { book: Book }) => {
  const { title, author, price, description, isbn, year, pages, ratio, editorial, imgurl } = book;
  
  return (
    <div className="mx-auto p-4">
      <div className="flex items-center justify-center">
        <Image 
          src={book.imgurl}
          height={720} 
          width={640} 
          alt={`Cover of ${title} by ${author}`} 
          className="w-full mb-8 rounded-md"
        />
      </div>
      
      <h1 className="text-5xl font-bold">{title}</h1>
      <h2 className="text-2xl my-2">{author}</h2>
      <p className="text-lg font-semibold">{price} S/.</p>
      
      <p className="my-8">{description}</p>
      
      <div className="border-t pt-4 mt-8 space-y-2">
        <p><strong>ISBN:</strong> {isbn}</p>
        <p><strong>Año:</strong> {year}</p>
        <p><strong>Páginas:</strong> {pages}</p>
        <p><strong>Dimensiones:</strong> {ratio} cm</p>
        <p><strong>Editorial:</strong> {editorial}</p>
      </div>
    </div>
  );
};

export default BookDetails;
