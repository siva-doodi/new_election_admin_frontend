import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const cookieStore = await cookies()   // ✅ MUST await
  const token = cookieStore.get("access_token")?.value

  if (token) {
    console.log(token,"ytt")
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}