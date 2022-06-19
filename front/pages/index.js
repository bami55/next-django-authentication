import { useSelector, useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {isAuthenticated && user ? (
        <div>
          <div>ようこそ、{user.name}さん</div>
          <div>あなたは無料会員です。</div>
          <div className="my-4 border-4 border-dashed border-gray-200 rounded">
            <div className="flex justify-center items-center h-64">こちらは無料コンテンツ！</div>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl">
          フルスタックチャンネルによる有料会員サイトのチュートリアルです。
        </div>
      )}
    </>
  );
};

export default Index;
