## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|name|string|null: false|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups, through: :groups_users
- has many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|member|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :groups_users
- has_many :groups_users

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
