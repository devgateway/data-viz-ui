export const post = (url : string, params : Record<string, unknown>, isBlob = false) => {

    return new Promise((resolve, reject) => {
        fetch(url, {

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(params)
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    if (isBlob) {
                        resolve(response.blob())
                    }
                    response.json().then(function (data) {
                        resolve(data)
                    }).catch(() => resolve(response.status))
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}

export const get = async <T extends any>(url: string, fetchOptions: RequestInit = {}, withHeaders = false): Promise<T | { data: T; meta: Record<string, string> }> => {
    try {
        const { headers: extraHeaders, ...restOptions } = fetchOptions as any;
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...extraHeaders,
            },
            ...restOptions,
        });

        if (!response.ok) {
            throw response;
        }

        const data: T = await response.json();

        if (withHeaders) {
            const meta: Record<string, string> = {};
            response.headers.forEach((value, key) => {
                meta[key] = value;
            });
            return { data, meta };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export const queryParams = (params : any) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}


export const getAnaliticUserCode = () => "CODE"
