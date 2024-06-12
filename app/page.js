import LoginButton from "../components/LoginButton";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mt-8 text-center">Welcome to Mini CRM</h1>
        <LoginButton />
      </div>
    </div>
  );
}
