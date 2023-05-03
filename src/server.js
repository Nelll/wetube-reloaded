import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";



/// create express application 
const app = express();
/// express와 관련된 code는 위에 있는 코드 아래부터 작성해야한다.

/// morgan("dev")은 status code와 respond 속도를 알려준다.
const logger = morgan("dev");


/// html을 pug로 express 뷰 엔진으로 표현이 가능해진다.
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
/// morgan 함수는 middleware를 return 해준다.
app.use(logger);
app.use(express.urlencoded({ extended: true}));
/// session 미들웨어
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);


app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;


