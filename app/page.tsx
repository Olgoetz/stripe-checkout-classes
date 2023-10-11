import Footer from "@/components/footer";
import Courses from "../components/courses";

export default function Home() {
  return (
    <>
      <main className="mx-auto min-h-screen flex flex-col container md:pt-16 p-6">
        <div className="flex-1">
          <Courses />
        </div>
        <Footer />
      </main>
    </>
  );
}
