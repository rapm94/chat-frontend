import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { loginUser } from "../../services/users";
import { useQuery } from "react-query";
export const MagicLinkPage = ({ setAuthenticated }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, status } = useQuery("verifyLink", async () => {
    if (params.link) {
      await loginUser(params.email, params.link);
    }
  });

  useEffect(() => {
    setAuthenticated(true);
    navigate("/");
  });

  console.log(data)

  return (
    <div>
      <h1>Magic Link</h1>
      <p>
        You will receive an email with a magic link. Click on the link to
        complete your sign up.
      </p>
    </div>
  );
};
