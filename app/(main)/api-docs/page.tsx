import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeWithCopy } from "@/components/CodeWithCopy";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ApiDocsPage() {
  const requestBody = {
    title: "My Awesome Function",
    language: "JavaScript",
    code: "function hello() {\n  return 'world';\n}",
    description: "A simple function that returns a string."
  };

  const curlExample = `curl -X POST 'https://sharecode.nephyy.tech/api/snippets' \\
-H 'Authorization: Bearer YOUR_SUPABASE_JWT' \\
-H 'Content-Type: application/json' \\
-d '${JSON.stringify(requestBody, null, 2)}'`;

  const responseExample = {
    success: true,
    message: "Snippet created successfully.",
    shareUrl: "https://sharecode.nephyy.tech/s/aBcDeF1g",
    shortId: "aBcDeF1g"
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">API Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Integrate Nephyy ShareCode with your own applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              Our API allows you to programmatically create private code snippets. To use the API, you need to authenticate by providing your Supabase JWT as a Bearer token in the Authorization header. This token is obtained when a user logs into your application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Create Snippet</h2>
            <p className="text-muted-foreground mb-4">
              This endpoint allows you to create a new private snippet.
            </p>
            <div className="flex items-center gap-2">
              <Badge>POST</Badge>
              <code className="text-sm font-mono p-1 bg-muted rounded">/api/snippets</code>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b pb-2 mb-4">Request Body</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell><code>title</code></TableCell>
                    <TableCell><code>string</code></TableCell>
                    <TableCell><Badge variant="destructive">Yes</Badge></TableCell>
                    <TableCell>The title of your snippet.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>language</code></TableCell>
                    <TableCell><code>string</code></TableCell>
                    <TableCell><Badge variant="destructive">Yes</Badge></TableCell>
                    <TableCell>The programming language.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><code>code</code></TableCell>
                    <TableCell><code>string</code></TableCell>
                    <TableCell><Badge variant="destructive">Yes</Badge></TableCell>
                    <TableCell>The code content to be shared.</TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell><code>description</code></TableCell>
                    <TableCell><code>string</code></TableCell>
                    <TableCell><Badge variant="secondary">No</Badge></TableCell>
                    <TableCell>An optional description.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="font-semibold">Example Request (cURL)</h3>
                <CodeWithCopy code={curlExample} language="bash" />
              </div>
              <div className="mt-6">
                <h3 className="font-semibold">Example Response (JSON)</h3>
                <CodeWithCopy code={JSON.stringify(responseExample, null, 2)} language="json" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
