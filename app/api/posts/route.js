import { NextResponse } from "next/server";
export async function GET(){
    let data=await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    data=await data.json();
 
    return NextResponse.json({
        success:true,
        result:data,
    });

}


// fetch() → Response

// .json() → Actual data

// await → Result ka wait

// async → await use karne ke liye function asynchronous

// NextResponse.json() → Apna JSON response return