import Link from "next/link";
import { Home, FolderOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
export default function NotFound() { return <section className="grid min-h-screen place-items-center py-32"><Container className="text-center"><p className="text-sm font-bold uppercase tracking-[.22em] text-accent">404 error</p><h1 className="mt-5 text-5xl font-extrabold tracking-[-.065em] text-white sm:text-7xl">Page Not Found</h1><p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-text-secondary">The page you are looking for may have been moved, deleted or never existed.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Button href="/"><Home className="size-4"/>Return Home</Button><Button href="/projects" variant="secondary"><FolderOpen className="size-4"/>View Projects</Button></div></Container></section>; }
