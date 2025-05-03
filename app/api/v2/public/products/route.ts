import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 12;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort");
    const order = searchParams.get("order") || "asc";

    console.log(
      `category: ${category}, search: ${search}, sort: ${sort}, order: ${order}, page: ${page}`
    );

    const filter: any = {
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
      ...(category !== "all" && {
        category: { contains: category, mode: "insensitive" },
      }),
    };

    const products = await prisma.products.findMany({
      where: filter,
      orderBy:
        sort && (sort === "name" || sort === "price")
          ? { [sort]: order }
          : undefined,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    const totalCount = await prisma.products.count({ where: filter });
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const categoriesResult = await prisma.products.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    const categories = categoriesResult.map(
      (c: { category: string }) => c.category
    );

    return NextResponse.json({
      products,
      totalPages,
      categories,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
