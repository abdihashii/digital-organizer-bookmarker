'use client';

import React, { useEffect, useState } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database.types';
import { useSearchParams } from 'next/navigation';

const itemsPerPage = 6;

const BookmarkPagination = ({ count }: { count: number | null }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);

	const searchParams = useSearchParams();
	const pageParam = searchParams.get('page');

	const totalPages = Math.ceil((count ?? 0) / itemsPerPage);

	// Calculate visible page numbers
	let startPage = currentPage - 1;
	if (startPage < 1) startPage = 1;
	let endPage = startPage + 2;
	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = endPage - 2 > 0 ? endPage - 2 : 1;
	}

	const pageNumbers = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);

	const supabase = createClientComponentClient<Database>();

	// Function to fetch bookmarks
	const fetchBookmarks = async (page: number) => {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage - 1;

		const { data, error } = await supabase
			.from('bookmarks')
			.select('*')
			.range(startIndex, endIndex)
			.order('created_at', { ascending: false });

		if (data) {
			setBookmarks(data);
		}
		// Handle error if necessary
	};

	// Initial fetch and fetch on currentPage change
	useEffect(() => {
		fetchBookmarks(currentPage);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const handlePreviousClick = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		const totalPages = Math.ceil((count ?? 0) / itemsPerPage);
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<Pagination>
			<PaginationContent>
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={handlePreviousClick}
						/>
					</PaginationItem>
				)}

				{pageNumbers.map((number, i) => (
					<PaginationItem key={i}>
						<PaginationLink
							href="#"
							onClick={() => setCurrentPage(number)}
							isActive={currentPage === number}
						>
							{number}
						</PaginationLink>
					</PaginationItem>
				))}

				{totalPages > 3 && <PaginationEllipsis />}

				{currentPage < totalPages && (
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={handleNextClick}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default BookmarkPagination;
