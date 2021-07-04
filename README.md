# トレサポ

トレーニングのスケジュール管理に特化したアプリです。  
日々のトレーニングスケジュールの確認と記録をチーム内で共有できます。  
レスポンシブル対応でスマホでも確認できます。
![Alt メインページの画面](/frontend/public/images/main-page.png)

## 概要

チームを作成し、チーム作成者がトレーニングスケジュールを作成することで、  
同じチームに加入しているユーザーがトレーニングスケジュールを共有することができます。  
![Alt 今日のスケジュールの画面](/frontend/public/images/about-image1.png)
また、スケジュールを実施した際に、実施記録を残すことができます。  
![Alt トレーニングを実施する画面](/frontend/public/images/finished-schedule-create-image.png)
(実施記録はトレーニングによって、回数、負荷、距離、時間を記録します。トレーニング作成時に何を記録するか選択できます。  
![Alt トレーニングを作成する画面](/frontend/public/images/training-create-image.png)
そして、チーム作成者はチームに加入しているユーザーのスケジュールの実施状況を確認できます。
![Alt トレーニングを作成する画面](/frontend/public/images/about-image3.png)
さらにユーザーはトレーニング別の実施状況を確認することができます。  
(チーム作成者はチームに加入しているユーザー全ての実施状況を確認できます。)
![Alt する画面](/frontend/public/images/about-image4.png)
チームで使うのはもちろん、個人でもスケジュールの確認と記録をするツールとして最適です。

## 使用技術

- frontend
  - node 16.3.0
  - next 11.0.1
  - typescript 4.3.4
  - recoil 0.3.1
  - formik 2.2.9
  - jest 26.6.3
  - apollo-client
- backend
  - Python 3.7.10
  - Django 3.1.2
  - graphene-django 2.13.0
- Postgres 10
- Docker/docker-compose
- CircleCi CI
- AWS
  - ECS
  - ECR
  - Route53

## 機能一覧

- ユーザー登録、ログイン機能、ゲストログイン機能
- チーム機能(一覧、作成、編集、加入)
- チーム作成者
  - トレーニング機能(一覧、作成、編集、削除)
  - スケジュール機能(一覧、作成、削除)
  - スケジュール実施機能(一覧、作成、削除)
  - メンバー参照機能
  - メンバーを脱退させる機能
  - メンバーにコーチ権限を譲渡する機能
  - 投稿機能(一覧、作成、削除)
  - ページネーション機能(トレーニング、スケジュール、スケジュール実施、メンバー、投稿)
  - 検索機能(メンバー)
- 一般ユーザー
  - トレーニング参照機能
  - スケジュール参照機能
  - スケジュール実施機能(一覧、作成、削除)
  - 投稿機能(一覧、作成、削除)
  - ページネーション機能(トレーニング、スケジュール、スケジュール実施、投稿)
- ゲストユーザー
  - トレーニング参照機能
  - スケジュール参照機能
  - ページネーション機能(トレーニング、スケジュール)
