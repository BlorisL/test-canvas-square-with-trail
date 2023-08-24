export default {
    squares: [
        {
            width: 40,
            height: 40,
            color: "blue",
            move: true,
            pos: {
                x: 100,
                y: 100
            },
            speed: {
                top: 1,
                right: 1,
                bottom: 1,
                left: 1
            },
            trail: {
                width: 10,
                height: 10,
                length: 5,
                enabled: false,
                color: "red",
                duration: 5,
                opacity: 1
            }
        },
        {
            width: 40,
            height: 40,
            color: "red",
            move: false,
            pos: {
                x: 200,
                y: 200
            },
            speed: {
                top: 1,
                right: 1,
                bottom: 1,
                left: 1
            },
            trail: {
                width: 10,
                height: 10,
                length: 5,
                enabled: false,
                color: "green",
                duration: 5,
                opacity: 1
            }
        }
    ]
}