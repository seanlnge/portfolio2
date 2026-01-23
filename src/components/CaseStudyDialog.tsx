import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type CaseStudyDialogProps = {
  projectName: string | null;
  caseStudySlug: string | null;
  onClose: () => void;
};

const CaseStudyDialog = ({
  projectName,
  caseStudySlug,
  onClose,
}: CaseStudyDialogProps) => {
  const [contentHtml, setContentHtml] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const slug = useMemo(() => caseStudySlug ?? "", [caseStudySlug]);

  useEffect(() => {
    if (!slug) {
      setContentHtml("");
      setError(null);
      return;
    }

    let isActive = true;
    setIsLoading(true);
    setError(null);

    fetch(`/markdown/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load case study.");
        }
        return response.text();
      })
      .then((html) => {
        if (!isActive) {
          return;
        }
        setContentHtml(html);
      })
      .catch(() => {
        if (!isActive) {
          return;
        }
        setError("Case study is unavailable right now.");
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [slug]);

  if (!projectName || !caseStudySlug) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="max-w-3xl rounded-3xl bg-m-white p-0 text-m-black shadow-2xl [&>button]:hidden">
        <DialogHeader className="flex-row items-center justify-between border-b border-black/10 px-6 py-4">
          <DialogTitle className="text-xl font-semibold font-header">
            {projectName}
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close case study"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 text-m-black transition duration-300 hover:border-m-black hover:bg-m-primary-light hover:text-m-white"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-6 text-sm leading-relaxed text-slate-700">
          {isLoading ? (
            <p>Loading case study...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <iframe src={`/markdown/${slug}`} className="w-full h-[60vh] select-none" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyDialog;
