export class ArrayUtils {
    public static sort(list: any[], propKey: string, type: string) {

        if (list) {

            if (type === "abc") {
                list.sort((a, b) => {

                    let _a = a[propKey] ? a[propKey].toUpperCase() : '';
                    let _b = b[propKey] ? b[propKey].toUpperCase() : '';

                    if (_a < _b) return -1;
                    if (_a > _b) return 1;
                    return 0;

                })
            } else if (type === "asci") { // asci
                list.sort((a, b) => {
                    return a.localeCompare(b);

                });
            } else { // by default sort by number

                list.sort((a, b) => {
                    return a - b;
                });

            }
        }

    }
}