import { Baby, ShieldCheck, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const badgeMap: { [key: string]: { icon: React.ReactNode, color: string } } = {
  Admin: { icon: <ShieldCheck className="w-4 h-4" />, color: 'text-red-500' },
  Expert: { icon: <Star className="w-4 h-4" />, color: 'text-yellow-500' },
  Rookie: { icon: <Baby className="w-4 h-4" />, color: 'text-green-500' },
};

export function UserBadges({ badges }: { badges: any[] }) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex items-center gap-1">
        {badges.map(userBadge => {
          const badgeInfo = badgeMap[userBadge.badges?.name || ''];
          if (!badgeInfo) return null;

          return (
            <Tooltip key={userBadge.badge_id}>
              <TooltipTrigger>
                <span className={badgeInfo.color}>{badgeInfo.icon}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{userBadge.badges?.name}: {userBadge.badges?.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
