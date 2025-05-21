import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between border-t p-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>&copy; {new Date().getFullYear()} Zangetsu Inc.</span>
      </div>
      <div className="flex gap-4 mt-4 md:mt-0">
        <Link href="/privacy" className="underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="underline-offset-4 hover:underline">
          Terms of Service
        </Link>
        <Link href="/contact" className="underline-offset-4 hover:underline">
          Contact
        </Link>
        <Link href="/about" className="underline-offset-4 hover:underline">
          About
        </Link>
      </div>
    </footer>
  );
}
