/**
 * Pehle, hum Zod aur Express ko import karenge:
 * > Zod    : Schema validation ke liye
 * > Express: Web server banane ke liye
 */
import { z } from 'zod';
import express from "express";

/**
 * Express app initialize karte hain
 */
const app = express();

/**
 * Zod se user profile ka schema define karte hain:
 * > name: Non-empty string hona chahiye
 * > email: Valid email address hona chahiye
 * > age: Optional hai, lekin agar hai to 18+ hona chahiye
 */
const userProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

/**
 * Type inference ka use karke userProfileSchema se FinalUserSchema type 
 * banate hain. Ye automatically saare types ko infer kar lega schema se
 */
export type FinalUserSchema = z.infer<typeof userProfileSchema>;

/**
 * PUT endpoint banate hain user data update karne ke liye
 * Request body ko validate karenge schema ke against
 */
app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updateBody: FinalUserSchema = req.body;

  if (!success) {
    res.status(411).json({});
    return;
  }

  // Database update ka code yahan aayega
  // updateBody ka use karke user ko update karenge

  res.json({
    message: "User updated"
  });
});

/**
 * Server ko port 3000 par start karte hain
 * Console me message dikhega jab server ready hoga
 */
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
