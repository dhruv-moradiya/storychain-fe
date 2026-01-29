import { Link, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

function NavItem({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  const { pathname } = useLocation();
  const isActive = pathname.includes(to);

  return (
    <li className="relative">
      <Button
        variant="link"
        className={cn(
          'gap-2 rounded-full px-3 text-[13.5px] font-medium',
          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
        asChild
      >
        <Link to={to}>
          {icon}
          {label}
        </Link>
      </Button>

      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="bg-primary absolute right-2 -bottom-1 left-2 h-[2px] rounded-full"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </li>
  );
}

export { NavItem };
