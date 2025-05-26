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

export const get = async <T extends any>(url: string, params = {}): Promise<T> => {
    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw response;
        }

        return await response.json();
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
