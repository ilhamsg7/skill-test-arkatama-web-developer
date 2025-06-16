import { IconEye, IconTrash } from 'justd-icons';
import { Button, Menu } from './ui';

type BaseActionProps = {
  url: any;
  id: any;
  setId: (id: any) => void;
  enableDelete?: boolean;
};

export const BaseAction = ({ url, id, setId, enableDelete = true }: BaseActionProps) => {
  return (
    <Menu>
      <Button size="extra-small" intent="outline">
        Action
      </Button>
      <Menu.Content>
        <Menu.Item className="flex flex-row gap-1" href={url}>
          <IconEye />
          Detail
        </Menu.Item>
        {enableDelete && (
          <Menu.Item className="flex flex-row gap-1" onAction={() => setId(id)}>
            <IconTrash />
            Delete
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu>
  );
};
