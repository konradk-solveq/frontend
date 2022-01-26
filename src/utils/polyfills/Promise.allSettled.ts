Promise.allSettled =
    Promise.allSettled ||
    ((promises: Array<Promise<any>>) =>
        Promise.all(
            promises.map(p =>
                p
                    .then(value => ({
                        status: 'fulfilled',
                        value,
                    }))
                    .catch(reason => ({
                        status: 'rejected',
                        reason,
                    })),
            ),
        ));

export {};
