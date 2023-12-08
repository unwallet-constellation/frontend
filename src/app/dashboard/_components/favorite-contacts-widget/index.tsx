import Link from 'next/link'
import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader } from '@/components/ui/card'

import { FAVORITE_CONTACTS } from './config'
import { Contact } from './types'

export default function FavoriteContactsWidget() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="px-6 py-4 text-sm font-medium ">
        Favorite Contacts ({FAVORITE_CONTACTS.length})
      </CardHeader>

      <div className="no-scrollbar flex gap-4 overflow-scroll px-6 pb-6 pt-2">
        {FAVORITE_CONTACTS.map((contact) => (
          <FavoriteContact
            key={`contact-${contact.domainName}-${contact.domainTld}`}
            {...contact}
          />
        ))}
      </div>
    </Card>
  )
}

const FavoriteContact: FC<Contact> = ({ domainName, domainTld, avatarUrl, websiteUrl }) => {
  const domain = `${domainName}.${domainTld}`
  const initials = (domainName[0] + domainTld[0]).toUpperCase()

  return (
    <Link
      href={websiteUrl}
      target="_blank"
      className="group flex w-[105px] shrink-0 flex-col items-center gap-4 outline-none"
      title={domain}
    >
      <Avatar className="h-[4.5rem] w-[4.5rem] select-none rounded-xl transition-all group-hover:scale-105">
        <AvatarImage src={avatarUrl} alt={domain} />
        <AvatarFallback className="font-mono text-xl">{initials}</AvatarFallback>
      </Avatar>
      <div className="max-w-full truncate font-mono text-xs font-semibold leading-none tracking-tight text-muted-foreground/75 transition-colors group-focus-within:text-foreground group-focus-within:underline group-hover:text-foreground">
        <span className="text-foreground">{domainName}</span>
        <span>.{domainTld}</span>
      </div>
    </Link>
  )
}
