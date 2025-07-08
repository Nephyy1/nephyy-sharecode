import { AlertTriangle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="space-y-4 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: July 8, 2025</p>
      </div>

      <div className="flex items-start gap-4 p-4 mb-8 rounded-lg border border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
        <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Disclaimer</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-400/80">
            This is a template and not legal advice. Please replace this content with your own official Privacy Policy.
          </p>
        </div>
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Welcome to Nephyy ShareCode. We respect your privacy and are committed to protecting it. This policy describes the types of information we collect from you when you use our website, and our practices for using, maintaining, and protecting that information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect several types of information from and about users of our Website, including:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> When you register for an account, we ask for your name and email address. This is used to identify you and allow you to log in to our service.
          </li>
          <li>
            <strong>User-Generated Content:</strong> We collect the code snippets, forum topics, posts, comments, and votes that you voluntarily create and share on our platform.
          </li>
          <li>
            <strong>Usage Details:</strong> As you navigate through the site, we may use automatic data collection technologies to collect certain information about your equipment, Browse actions, and patterns, including details of your visits and traffic data.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use information that we collect about you or that you provide to us, including any personal information:
        </p>
        <ul>
          <li>To present our Website and its contents to you.</li>
          <li>To provide you with the services you request, such as sharing code and participating in forums.</li>
          <li>To manage your account and identify you as the author of your content.</li>
          <li>To notify you about changes to our website or any services we offer.</li>
          <li>For any other purpose with your consent.</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. You are responsible for keeping your password confidential.
        </p>
        
        <h2>4. Contact Information</h2>
        <p>
          To ask questions or comment about this privacy policy and our privacy practices, contact us at: support@nephyy.tech
        </p>
      </article>
    </div>
  );
}
