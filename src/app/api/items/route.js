import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";
// This function handles SAVING a new item
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newItem = await Item.create(body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// This function handles FETCHING all items
export async function GET() {
  try {
    await dbConnect();
    const items = await Item.find({});
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}