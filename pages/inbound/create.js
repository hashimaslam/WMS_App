import MainLayout from "../../layouts/MainLayout";
import CreateRequest from "../../modules/inbound/components/CreateRequest";
import { useDispatch } from "react-redux";

export default function InboundCreateReq() {
  const dispatch = useDispatch();
  return (
    <MainLayout>
      <CreateRequest dispatch={dispatch} />
    </MainLayout>
  );
}
