export class Helpers {
    static toUpperCaseFirstLetter(input) {
        input.value = input.value.replace(/( |^)[а-яёa-z]/g, function(u){ return u.toUpperCase(); }  );
    }
}