export async function validateHCaptcha(token: string): Promise<boolean> {
    const SECRET_KEY = Deno.env.get("HCAPTCHA_SECRET")!;  
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: SECRET_KEY,
        response: token,
      }),
    });
    const data = await response.json();
    return data.success;
  }