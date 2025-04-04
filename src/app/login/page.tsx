'use client'

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { setEmail, setPassword, setUser, setError, setLoading } from "@/store/slicers/registrationReducer";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '@/utils/firebase';

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { email, password, error, loading } = useSelector((state: RootState) => state.registration);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;
            dispatch(setUser({ email: user.email!, uid: user.uid }));

            router.push("/")
        } catch (error: any) {
            dispatch(setError("Невірний email або пароль."))
        } finally {
            dispatch(setLoading(false))
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()

        try {
            dispatch(setLoading(true))

            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            dispatch(setUser({ email: user.email!, uid: user.uid }))

            router.push("/")
        } catch (error: any) {
            dispatch(setError("Помилка при вході через Google."))
        } finally {
            dispatch(setLoading(false))
        }
    };

    const handlePasswordReset = async () => {
        try {
            if (!email) {
                dispatch(setError("Введіть email для відновлення пароля."))
                return
            }

            await sendPasswordResetEmail(auth, email)
            dispatch(setError("Лист з інструкціями по відновленню пароля надіслано."))
        } catch (error: any) {
            dispatch(setError("Помилка при відновленні пароля."))
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Увійти</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {loading && <p className="text-blue-500">Завантаження...</p>}

                <button
                    type="submit"
                    className="w-full mt-4 p-2 bg-gray-500 text-white rounded cursor-pointer"
                >
                    Увійти
                </button>
            </form>

            <p className="mt-4 text-center">
                Не маєте акаунту? <a href="/registration" className="text-blue-500">Зареєструйтесь</a>
            </p>

            <div className="mt-4 text-center">
                <button
                    onClick={handleGoogleLogin}
                    className="w-full p-2 bg-gray-500 text-white rounded cursor-pointer"
                >
                    Увійти через Google
                </button>
            </div>

            <p className="mt-4 text-center">
                <a
                    onClick={handlePasswordReset}
                    className="text-blue-500 cursor-pointer"
                >
                    Забули пароль?
                </a>
            </p>
        </div>
    );
}
