import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().trim().minLength(2).maxLength(20),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20).confirmed(),
  // userRole: vine.string().trim(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(20),
});

/*
Ye code user registration aur login ke liye validation schema define kr raha hai using VineJS library.

Pehle line me:
- "@vinejs/vine" library ko import kiya hai jo validation ke liye use hota hai

registerSchema me:
- vine.object() se ek object schema banaya hai jisme 3 fields hai:
  1. name: string type, spaces trim honge, minimum 2 aur maximum 20 characters
  2. email: string type jo valid email format me hona chahiye
  3. password: string type, min 6 aur max 20 characters, confirmed() means confirm password bhi match hona chahiye

loginSchema me:
- vine.object() se login ke liye schema banaya hai jisme 2 fields hai:
  1. email: string type jo valid email format me hona chahiye 
  2. password: string type, min 6 aur max 20 characters

/*
Mongoose schema aur validation schema (jaise VineJS) dono alag purposes ke liye hote hain:

1. Mongoose Schema ka purpose:
   - Database structure define karta hai
   - Collections me documents ka format set karta hai
   - Database level pe data validation provide karta hai
   - Database operations ke liye methods aur middleware add karta hai

2. VineJS jaise validation schema ka purpose:
   - User input ko validate karta hai database tak pahunchne se pehle
   - Frontend/API level pe validation provide karta hai
   - Better error messages de sakta hai users ko
   - Performance better rehti hai kyuki invalid data database tak nahi jata
   - Security layer add karta hai - malicious data ko rok sakta hai

Dono ka combined use karne ke fayde:
1. Multiple layers of validation - extra security
2. Better user experience - instant frontend validation
3. Clean code structure - validation logic alag file me
4. Reusability - same validation rules different jagah use kar sakte hain
5. Database ko unnecessary load se bachata hai

Example: Agar user invalid email submit karta hai:
- Pehle VineJS check karega aur turant error message show karega
- Agar VineJS se bach gaya to Mongoose second layer of defense hai
- Is tarah database unnecessary calls se bach jati hai
*/

// Dono schemas ko export kiya hai taki dusri files me use kr sake
// */
