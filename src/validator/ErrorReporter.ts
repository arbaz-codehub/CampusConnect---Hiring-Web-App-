import { errors } from "@vinejs/vine";
import { FieldContext, ErrorReporterContract } from "@vinejs/vine/types";

export default class ErrorReporter implements ErrorReporterContract {
  /**
   * A flag to know if one or more errors have been
   * reported
   */
  hasErrors: boolean = false;

  /**
   * A collection of errors. Feel free to give accurate types
   * to this property
   */
  errors: any = {};

  /**
   * VineJS call the report method
   */
  report(message: string, rule: string, field: FieldContext, meta?: any) {
    this.hasErrors = true;

    /**
     * Collecting errors as per the JSONAPI spec
     */
    this.errors[field.wildCardPath] = message;
  }

  /**
   * Creates and returns an instance of the
   * ValidationError class
   */
  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}

/*
Ye code VineJS validation library ke liye custom error reporter class create kr raha hai jo validation errors ko handle krta hai.

Line by line explanation:

1. Imports:
   - @vinejs/vine se errors import kiye hai validation errors ke liye
   - @vinejs/vine/types se FieldContext aur ErrorReporterContract types import kiye hai

2. ErrorReporter class:
   - ErrorReporterContract ko implement krta hai jo VineJS ka interface hai
   - hasErrors property boolean type ki hai jo batati hai ki koi error hai ya nahi
   - errors property ek empty object hai jisme saare errors store honge

3. report() method:
   - 4 parameters leta hai: message, rule, field, aur optional meta
   - jab bhi koi validation fail hoti hai to ye method call hota hai
   - hasErrors ko true set krta hai
   - field.wildCardPath ko key banakr errors object me error message store krta hai

4. createError() method:
   - E_VALIDATION_ERROR class ka new instance create krta hai
   - collected errors ko parameter me pass krta hai
   - ye method final validation error object return krta hai

Is class ka use form validation me hota hai jab user koi invalid data submit krta hai,
tab ye class proper error messages collect krke return kr deti hai jisse frontend pe
user ko sahi error messages dikha sakte hai.
*/
