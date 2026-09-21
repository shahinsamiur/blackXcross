import { FiUser, FiUsers } from "react-icons/fi";
import { myContacts } from "../../../_mock/blackxcross";
import ProfileAvatar from "../../../components/ProfileAvatar";

const followers = myContacts;

export default function FollowersPage() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <FiUsers size={18} className="text-muted" />
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Followers
        </h1>
      </div>

      {followers.length > 0 ? (
        <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {followers.map((contact, i) => (
            <li
              key={`${contact.id}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              {contact.avatar ? (
                <ProfileAvatar
                  src={contact.avatar}
                  alt={contact.name}
                  size={36}
                />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-muted">
                  <FiUser size={16} />
                </span>
              )}
              <span className="truncate text-sm text-foreground/90">
                {contact.name}
              </span>
              {contact.online && (
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-border bg-card p-6 text-sm text-muted">
          No followers yet.
        </p>
      )}
    </div>
  );
}
