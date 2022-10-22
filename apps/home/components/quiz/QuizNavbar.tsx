import Link from "next/link";

const QuizNavbar = () => {
  return (
    <nav className="flex justify-end px-6 py-2 w-full bg-white">
      <Link href="/signout">
        <button className="rounded-full bg-glossy-coral px-3 py-1 text-white font-light text-sm">
          Signout
        </button>
      </Link>
    </nav>
  );
};

export default QuizNavbar;
