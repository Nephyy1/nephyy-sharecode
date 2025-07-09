import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code, language } = await request.json();

  if (!code || !language) {
    return NextResponse.json({ output: 'Language and code are required.' }, { status: 400 });
  }

  const pistonApiBody = {
    language: language,
    version: "*",
    files: [
      {
        content: code,
      },
    ],
  };

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pistonApiBody),
    });

    const result = await response.json();

    let output = '';
    if (result.run.stdout) {
      output = result.run.stdout;
    } else if (result.run.stderr) {
      output = result.run.stderr;
    } else if (result.message) {
      output = result.message;
    } else {
      output = 'Execution finished with no output.';
    }
    
    return NextResponse.json({ output: output.trim() });

  } catch (error) {
    return NextResponse.json({ output: 'An error occurred while connecting to the execution engine.' }, { status: 500 });
  }
}
